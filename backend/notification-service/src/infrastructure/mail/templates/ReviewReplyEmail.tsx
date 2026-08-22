import {Body, Button, Container, Head, Html, Section, Text} from '@react-email/components'

interface ReviewReplyEmailProps{
    productName:string,
    reviewUrl:string,
    replyText:string
}

export const ReviewReplyEmail=({productName,reviewUrl,replyText}:ReviewReplyEmailProps)=>{
    return (
        <Html>
            <Head/>
              <Body style={{backgroundColor:'#f6f9fc',padding:'20px 0'}}>
                <Container style={{backgroundColor:'#ffffff',padding:'20px',borderRadius:'5px'}}>
                    <Text style={{fontSize:'20px',fontWeight:'bold',color:'#333'}}>
                        Нова відплвідь на твій відгук 
                    </Text>
                    <Text style={{fontSize:'16px',color:'#333'}}>
                        Продавець відповів на твій коментар до товару <b>{productName}</b>
                    </Text>
                    <Section style={{backgroundColor:'#f1f1f1',padding:'15px',borderRadius:'4px',margin:'15px 0'}}>
                    <Text style={{fontStyle:'italic', margin:0}}>
                        {replyText}
                    </Text>
                    </Section>
                    <Button href={reviewUrl}
                    style={{backgroundColor:'#00a046',color:'#fff',padding:'12px 20px',borderRadius:'4px',textDecoration:'none'}}>
                        Переглянути на сайті
                    </Button>
                </Container>
              </Body>
        </Html>
    )
}