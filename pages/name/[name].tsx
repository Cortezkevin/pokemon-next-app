import { pokeApi } from '@/apidemo';
import { Pokemon, PokemonListResponse } from '@/interfacesdemo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from "@/components/layouts/Layoutdemo";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";

import { useState } from "react";
import { getPokemonInfo, localFavorites } from '@/utilsdemo';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon
}

const PokemonsByNamePage: NextPage<Props> = ({ pokemon }) => {

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites );

    if( !isInFavorites ){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }
  }

  const [isInFavorites, setIsInFavorites] = useState( 
    localFavorites.existInFavorites( pokemon.id )    
  );

  return (
    <Layout title={`Pokemon ${ pokemon.name }`} >
      <Grid.Container css={{ marginTop: "5px" }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 }>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || 'mp-image.png'}
                alt={ pokemon.name }
                width={ '100%' }
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>

      <Grid xs={ 12 } sm={ 8 } >
        <Card>
          <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
            <Text transform="capitalize" h1>{ pokemon.name }</Text>
            <Button
              color={"gradient"}
              ghost={ !isInFavorites }
              onClick={ onToggleFavorite }
            >
              { isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30} >Sprites</Text>
            <Container direction="row" display="flex">
              <Image 
                src={ pokemon.sprites.front_default }
                alt={ pokemon.name }
                width={100}
                height={100}
              />
              <Image 
                src={ pokemon.sprites.back_default }
                alt={ pokemon.name }
                width={100}
                height={100}
              />
              <Image 
                src={ pokemon.sprites.front_shiny }
                alt={ pokemon.name }
                width={100}
                height={100}
              />
              <Image 
                src={ pokemon.sprites.back_shiny }
                alt={ pokemon.name }
                width={100}
                height={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>

      </Grid.Container>
    </Layout>
  )
}

export default PokemonsByNamePage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data: { results } } = await pokeApi.get<PokemonListResponse>(`/pokemon/?limit=151`);
  const pokemonNames: string[] = results.map( p => p.name );

    return {
      paths: pokemonNames.map( name => ({
        params: { name }
      })),
      fallback: false
    }
  }
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {    
    
    const { name: searchName } = params as { name: string };

    return {
      props: {
        pokemon: await getPokemonInfo( searchName )
      }
    }
  }