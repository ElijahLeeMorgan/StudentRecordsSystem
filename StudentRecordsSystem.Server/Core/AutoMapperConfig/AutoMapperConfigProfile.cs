using AutoMapper;
using StudentRecordsSystem.Server.Core.Dtos.Building;
using StudentRecordsSystem.Server.Core.Dtos.Grade;
using StudentRecordsSystem.Server.Core.Dtos.Student;
using StudentRecordsSystem.Server.Core.Dtos.Class;
using StudentRecordsSystem.Server.Core.Entities;

namespace StudentRecordsSystem.Server.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            // Building
            CreateMap<BuildingCreateDto, Building>();
            CreateMap<Building, BuildingGetDto>();

            // Grade
            CreateMap<GradeCreateDto, Grade>();
            CreateMap<Grade, GradeGetDto>()
                .ForMember(dest => dest.BuildingName, opt => opt.MapFrom(src => src.Building.Name));

            // Student
            CreateMap<StudentCreateDto, Student>();
            CreateMap<Student, StudentGetDto>()
                .ForMember(dest => dest.GradeYear, opt => opt.MapFrom(src => src.Grade.Year));

            // Class
            CreateMap<ClassCreateDto, Class>();
            CreateMap<Class, ClassGetDto>()
                .ForMember(dest => dest.StudentFirstName, opt => opt.MapFrom(src => src.Student.FirstName))
                .ForMember(dest => dest.StudentLastName, opt => opt.MapFrom(src => src.Student.LastName));
        }
    }
}
