import { SmallPokemon } from '@/interfacesdemo';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
    pokemon: SmallPokemon
}

export const PomekonCard: FC<Props> = ({ pokemon: { name, id, img } }) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${name}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={name}>
        <Card hoverable clickable onClick={ onClick }>
        <Card.Body css={{ p: 4 }}>
            <Card.Image 
            src={ img }
            width={ "100%" }
            height={ 140 }
            />
            <Card.Footer>
            <Row justify='space-between'>
                <Text transform='capitalize'>{ name }</Text>
                <Text>{ id }</Text>
            </Row>
            </Card.Footer>
        </Card.Body>
        </Card>
    </Grid>
  )
}
