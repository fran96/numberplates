using AutoMapper;
using NumberPlates.Data.Entities;
using NumberPlates.WebApi.ViewModels.Models;

namespace NumberPlates.WebApi.ViewModels.Mappings.Configurations
{
    public class EntitiesToViewModels : Profile
    {
        public EntitiesToViewModels()
        {
            CreateMap<CommentEntity, CommentViewModel>()
                .ForMember(dest=>dest.NumberPlate, opt=>opt.MapFrom(src=>src.NumberPlate.NumberPlate));
            CreateMap<NumberPlateEntity, NumberPlateViewModel>().ReverseMap();
        }
    }
}
