using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
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

        //Delete
    }
}
