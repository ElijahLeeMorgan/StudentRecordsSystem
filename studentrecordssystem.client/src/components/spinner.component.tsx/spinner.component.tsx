import { Box, CircularProgress } from "@mui/material"

//I had trouble importing the --Blue color from global.scss. In a real project I'd look into this issue further, but more likely than not I'm just missing something simple.
//Also, no point in building an etire stylesheet for a single spinner component.

const Spinner = () => {
    return (
        <Box display="center" justifyContent="center" alignItems="center" height="25vh" color="#4864FF">
            <CircularProgress />
        </Box>
    )
}

export default Spinner;