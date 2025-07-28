using ProductCatalog.Api.Models;

namespace ProductCatalog.Api.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAll();
    Task<Product?> GetById(Guid id); // Corrigido aqui
    Task Create(Product product);
    Task Update(Product product);
    Task Delete(Guid id);
}
