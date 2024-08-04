using AutoMapper;
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
        public async Task<IActionResult> CreateBuilding([FromBody] BuildingUpdateDto dto)
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
            //var buildings = await _context.Buildings.OrderBy(q => q.ID).ToListAsync();
            var buildings = await _context.Buildings.ToListAsync();//TODO Allow users to choose the sorting method
            var convertedBuildings = _mapper.Map<IEnumerable<BuildingGetDto>>(buildings);

            return Ok(convertedBuildings);
        }

        //TODO

        // Read by Id

        // Update
        [HttpPut]
        [Route("Put")]
        public async Task<IActionResult> UpdateBuilding(ulong id, [FromBody] BuildingUpdateDto dto)
        {
            var existingBuilding = await _context.Buildings.FindAsync(id);
            if (existingBuilding == null)
            {
                return NotFound("Building not found");
            }

            _mapper.Map(dto, existingBuilding); // Update the existing building with new data
            _context.Buildings.Update(existingBuilding);
            await _context.SaveChangesAsync();

            return Ok("Building updated successfully");
        }


        // Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteBuilding(ulong id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound("Building not found");
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return Ok("Building deleted successfully");
        }
    }
}
