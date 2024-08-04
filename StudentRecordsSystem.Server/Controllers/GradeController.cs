using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
using StudentRecordsSystem.Server.Core.Dtos.Class;
using StudentRecordsSystem.Server.Core.Dtos.Grade;
using StudentRecordsSystem.Server.Core.Entities;

namespace StudentRecordsSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public GradeController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateGrade([FromBody] GradeCreateDto dto)
        {
            var newGrade = _mapper.Map<Grade>(dto);//Change var to Grade?
            await _context.Grades.AddAsync(newGrade);
            await _context.SaveChangesAsync();

            return Ok("Grade Created Successfully");
        }

        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<GradeGetDto>>> GetGrades()
        {
            var grades = await _context.Grades.Include(grade => grade.Building).ToListAsync();//Change var to Grade?
            var convertedGrades = _mapper.Map <IEnumerable<GradeGetDto>>(grades);

            return Ok(convertedGrades);
        }

        // Read by Id

        // Update
        [HttpPut]
        [Route("Put")]
        public async Task<IActionResult> UpdateGrade(ulong id, [FromBody] GradeUpdateDto dto)
        {
            var existingGrade = await _context.Grades.FindAsync(id);
            if (existingGrade == null)
            {
                return NotFound("Grade not found");
            }

            _mapper.Map(dto, existingGrade);
            _context.Grades.Update(existingGrade);
            await _context.SaveChangesAsync();

            return Ok("Grade updated successfully");
        }

        // Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteGrade(ulong id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
            {
                return NotFound("Grade not found");
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            return Ok("Grade deleted successfully");
        }
    }
}
