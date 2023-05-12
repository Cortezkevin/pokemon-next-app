import { Layout } from '@/components/layouts/Layoutdemo'
import { FavoritePokemons, NoFavoritos } from '@/components/uidemo';
import { localFavorites } from '@/utilsdemo';
import { NextPage } from 'next'
import { useEffect, useState } from 'react';

const FavoritesPage: NextPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );
  }, [])

  return (
    <Layout title='Favorite Pokemons'>
      {
        favoritePokemons.length === 0
        ? <NoFavoritos />
        : <FavoritePokemons pokemons={ favoritePokemons } />
      }
    </Layout>
  )
}

export default FavoritesPage;
