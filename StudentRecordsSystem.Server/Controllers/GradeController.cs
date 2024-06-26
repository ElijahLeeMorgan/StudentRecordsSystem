﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRecordsSystem.Server.Core.Context;
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

        // Delete
    }
}
