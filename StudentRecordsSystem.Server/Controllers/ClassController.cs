using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
using StudentRecordsSystem.Server.Core.Dtos.Class;
using StudentRecordsSystem.Server.Core.Entities;

namespace StudentRecordsSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public ClassController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateClass([FromBody] ClassCreateDto dto)
        {
            var newClass = _mapper.Map<Class>(dto);
            await _context.Classes.AddAsync(newClass);
            await _context.SaveChangesAsync();

            return Ok("Class Created Successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ClassGetDto>>> GetClasses()
        {
            var classes = await _context.Classes.Include(classEntity => classEntity.Student).ToListAsync();
            var convertedClasses = _mapper.Map<IEnumerable<ClassGetDto>>(classes);

            return Ok(convertedClasses);
        }

        //Read by Id

        //Update
        [HttpPut]
        [Route("Put")]
        public async Task<IActionResult> UpdateClass(ulong id, [FromBody] ClassGetDto dto)
        {
            var existingClass = await _context.Classes.FindAsync(id);
            if (existingClass == null)
            {
                return NotFound("Class not found");
            }

            _mapper.Map(dto, existingClass);
            _context.Classes.Update(existingClass);
            await _context.SaveChangesAsync();

            return Ok("Class updated successfully");
        }

        //Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteClass(ulong id)
        {
            var classObject = await _context.Classes.FindAsync(id);
            if (classObject == null)
            {
                return NotFound("Class not found");
            }

            _context.Classes.Remove(classObject);
            await _context.SaveChangesAsync();

            return Ok("Class deleted successfully");
        }
    }
}

