import { GetStaticProps, NextPage } from 'next'
import { Layout } from '@/components/layouts/Layoutdemo';
import { pokeApi } from '@/apidemo';
import { PokemonListResponse, SmallPokemon } from '@/interfacesdemo';
import { PomekonCard } from '../components/pokemon';
import { Grid } from '@nextui-org/react';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Gaaaa' >      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( p => 
            <PomekonCard key={ p.id } pokemon={ p } />
          )
        }
      </Grid.Container>
    </Layout>
  )
}

export default HomePage;

export const getStaticProps: GetStaticProps = async (ctx) => {    

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map( p => {
    const urlParts = p.url.split('/');
    const id = parseInt(urlParts[ urlParts.length - 2 ]);
    return { ...p, id, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` }
  });  

  return {
      props: {
        pokemons
      }
  }
}