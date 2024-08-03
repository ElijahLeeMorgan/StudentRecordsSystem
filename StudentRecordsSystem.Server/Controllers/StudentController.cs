using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
using StudentRecordsSystem.Server.Core.Dtos.Class;
using StudentRecordsSystem.Server.Core.Dtos.Student;
using StudentRecordsSystem.Server.Core.Entities;

namespace StudentRecordsSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public StudentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateStudent([FromBody] StudentCreateDto dto)
        {
            var newStudent = _mapper.Map<Student>(dto);
            await _context.Students.AddAsync(newStudent);
            await _context.SaveChangesAsync();

            return Ok("Student Created Successfully");
        }
        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<StudentGetDto>>> GetStudents()
        {
            var students = await _context.Students.Include(student => student.Grade).ToListAsync();
            var convertedStudents = _mapper.Map<IEnumerable<StudentGetDto>>(students);

            return Ok(convertedStudents);
        }

        //Read by Id

        //Update
        [HttpPut]
        [Route("Put")]
        public async Task<IActionResult> UpdateStudent(ulong id, [FromBody] StudentGetDto dto)
        {
            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound("Student not found");
            }

            _mapper.Map(dto, existingStudent);
            _context.Students.Update(existingStudent);
            await _context.SaveChangesAsync();

            return Ok("Student updated successfully");
        }

        //Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteStudent(ulong id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound("Student not found");
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok("Student deleted successfully");
        }
    }
}
