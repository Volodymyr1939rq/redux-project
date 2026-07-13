import { Link } from "react-router-dom";

// Описуємо типи для пропсів
interface SubCategoriesGridProps {
  subCategories?: any[];
  isLoading?: boolean;
}

export const SubCategoriesGrid = ({ subCategories = [], isLoading }: SubCategoriesGridProps) => {
  
  if (isLoading) {
    return (
      <div style={{ width: '100%', padding: '20px', textAlign: 'center', color: '#666' }}>
        Завантаження підкатегорій...
      </div>
    );
  }

  if (subCategories.length === 0) {
    return null;
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', boxSizing: 'border-box' }}>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 1fr)',
        rowGap: '42px',
        boxSizing: 'border-box'
      }}>
        
        {subCategories.map((cat, index) => {
          // Автоматично визначаємо, чи є в цієї підкатегорії свої вкладені підкатегорії (Level 3)
          const hasChildren = cat.children && cat.children.length > 0;
          const isCentered = !hasChildren;

          return (
            <div 
              key={cat.id} 
              style={{
                position: 'relative',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              {/* Картинка підкатегорії */}
              <Link 
                to={`/category/${cat.id}`}
                style={{ display: 'block', width: '100%', height: '120px', marginBottom: '16px' }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  boxSizing: 'border-box'
                }}>
                  <img 
                    src={cat.image || 'https://placehold.co/120x120/f5f5f5/a0a0a0?text=No+Image'} 
                    alt={cat.title} 
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }} 
                  />
                </div>
              </Link>

              {/* Головне посилання на підкатегорію */}
              <Link 
                to={`/category/${cat.id}`} 
                style={{
                  color: '#3e77aa',
                  fontSize: '15px',
                  marginBottom: '12px',
                  textDecoration: 'none',
                  textAlign: isCentered ? 'center' : 'left',
                  lineHeight: '1.2',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f84147'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#3e77aa'}
              >
                {cat.title}
              </Link>

              {/* Список під-підкатегорій (Level 3), якщо вони є */}
              {hasChildren && (
                <ul style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto',
                  padding: 0,
                  margin: 0,
                  listStyle: 'none'
                }}>
                  {cat.children.map((child: any) => (
                    <li key={child.id} style={{ margin: 0, padding: 0 }}>
                      <Link 
                        to={`/category/${child.id}`} 
                        style={{
                          color: '#3e77aa',
                          fontSize: '13px',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f84147'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#3e77aa'}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Сіра лінія-роздільник між стовпчиками */}
              {(index + 1) % 6 !== 0 && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '27px',    
                  bottom: '25px', 
                  width: '1px',  
                  backgroundColor: '#e5e5e5' 
                }} />
              )}
            </div>
          );
        })}
        
      </div>
    </div>
  );
};