import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image";
import NextLink from 'next/link';

export const Navbar = () => {

    const { theme } = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
        backgroundColor: theme?.colors.gray900.value
    }} >

        <Image 
            src={ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' }
            alt="icon"
            width={70}
            height={70}
            
        />

        <NextLink href={"/"} passHref>
            <Link as="div">
                <Text color="white" h2 >P</Text>
                <Text color="white" h3>okémon</Text>
            </Link>
        </NextLink>

        <Spacer css={{
            flex: 1
        }} />

        <NextLink href={"/favorites"} passHref>
            <Link as="div">
                <Text color="white">Favorites</Text>
            </Link>
        </NextLink>
    </div>
  )
}