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

    public async Task<IEnumerable<ProductDto>> GetAll()
    {
        var products = await _repository.GetAll();

        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            Code = p.Code,
            Description = p.Description,
            DepartmentCode = p.DepartmentCode,
            Price = p.Price,
            IsActive = p.IsActive,
            Deleted = p.Deleted
        });
    }

    public async Task<ProductDto?> GetById(Guid id)
    {
        var product = await _repository.GetById(id);
        if (product == null) return null;

        return new ProductDto
        {
            Id = product.Id,
            Code = product.Code,
            Description = product.Description,
            DepartmentCode = product.DepartmentCode,
            Price = product.Price,
            IsActive = product.IsActive,
            Deleted = product.Deleted
        };
    }

    public async Task Create(ProductDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.DepartmentCode))
            throw new ArgumentException("DepartmentCode é obrigatório");

        var product = new Product
        {
            Id = Guid.NewGuid(),
            Code = dto.Code ?? string.Empty,
            Description = dto.Description ?? string.Empty,
            DepartmentCode = dto.DepartmentCode,
            Price = dto.Price,
            IsActive = dto.IsActive,
            Deleted = false
        };

        await _repository.Create(product);
    }

    public async Task Update(Guid id, ProductDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.DepartmentCode))
            throw new ArgumentException("DepartmentCode é obrigatório");

        var product = new Product
        {
            Id = id,
            Code = dto.Code ?? string.Empty,
            Description = dto.Description ?? string.Empty,
            DepartmentCode = dto.DepartmentCode,
            Price = dto.Price,
            IsActive = dto.IsActive,
            Deleted = dto.Deleted
        };

        await _repository.Update(product);
    }


    public async Task Delete(Guid id)
    {
        await _repository.Delete(id);
    }
}
