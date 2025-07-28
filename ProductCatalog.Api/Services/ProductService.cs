using ProductCatalog.Api.Dtos;
using ProductCatalog.Api.Models;
using ProductCatalog.Api.Repositories;

namespace ProductCatalog.Api.Services;

public class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Product>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<Product?> GetById(Guid id)
    {
        var result = await _repository.GetById(id);
        return result ?? null;
    }

    public async Task Create(ProductDto dto)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Code = dto.Code ?? string.Empty,
            Description = dto.Description ?? string.Empty,
            DepartmentCode = dto.DepartmentCode ?? string.Empty,
            Price = dto.Price,
            IsActive = dto.IsActive,
            Deleted = false
        };

        await _repository.Create(product);
    }

    public async Task Update(Guid id, ProductDto dto)
    {
        var product = new Product
        {
            Id = id,
            Code = dto.Code ?? string.Empty,
            Description = dto.Description ?? string.Empty,
            DepartmentCode = dto.DepartmentCode ?? string.Empty,
            Price = dto.Price,
            IsActive = dto.IsActive
        };

        await _repository.Update(product);
    }

    public async Task Delete(Guid id)
    {
        await _repository.Delete(id);
    }
}
