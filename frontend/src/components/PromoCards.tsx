export const PromoCards=()=>{
    return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ backgroundColor: '#e5f4eb', padding: '16px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 'bold', color: '#221f1f', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '2px', padding: '0 4px', fontSize: '10px', border: '1px solid #00a046', height: '18px', display: 'flex', alignItems: 'center' }}>
                            💳
                        </div>
                        Картка Rozetka
                    </div>
                    <div style={{ fontSize: '13px', color: '#4d4b4b' }}>Персональні знижки та бонуси</div>
                </div>

                <div style={{ backgroundColor: '#fff8d6', padding: '16px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 'bold', color: '#221f1f', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ backgroundColor: '#ffeb00', color: 'black', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '12px', fontWeight: 900, letterSpacing: '-1px' }}>
                            S!
                        </span>
                        Підписка Smart
                    </div>
                    <div style={{ fontSize: '13px', color: '#4d4b4b', lineHeight: '1.2' }}>
                        Безкоштовна доставка з Rozetka+Prom за 50 ₴/міс
                    </div>
                </div>
                
            </div>
    )
}