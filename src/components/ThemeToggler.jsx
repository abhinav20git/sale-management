
import { useColorMode, Box, IconButton} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box textAlign="center" py={4} >
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <h2>Toggle Theme</h2>
        </Box>
      );
}







