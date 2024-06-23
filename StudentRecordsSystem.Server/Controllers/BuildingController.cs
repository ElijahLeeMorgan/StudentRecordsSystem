using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
using StudentRecordsSystem.Server.Core.Dtos.Building;
using StudentRecordsSystem.Server.Core.Entities;


namespace StudentRecordsSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public BuildingController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateBuilding([FromBody] BuildingCreateDto dto)
        {
            Building newBuilding = _mapper.Map<Building>(dto);
            await _context.Buildings.AddAsync(newBuilding);
            await _context.SaveChangesAsync();

            return Ok("Building Created Successfully");
        }
        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<BuildingGetDto>>> GetBuildings()
        {
            var buildings = await _context.Buildings.ToListAsync();//Change var to Building?
            var convertedBuildings = _mapper.Map<IEnumerable<BuildingGetDto>>(buildings);

            return Ok(convertedBuildings);
        }

        //TODO

        // Read by Id

        // Update

        // Delete

    }
}
