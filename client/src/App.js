import * as React from 'react';
import {memo, useMemo, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CircularProgress, TableCell, TableRow, TextField} from "@mui/material";
import {CommentsService} from "./api/CommentsService";
import Footer from "./components/Footer";
import CommentsTable from "./components/CommentsTable";
import {useDebounce} from "use-debounce";


const theme = createTheme();
const rounededNum = (num) => Number((num).toPrecision(2))
const getPercent = num => rounededNum(num * 100)

const LinkField = memo((props) => {
    const {
        onSubmit = () => { },
        ...args
    } = props
    const [text, setText] = useState('')
    const [value] = useDebounce(text, 400);
    const error = useMemo(() => {
        if (text.trim() === "") {
            return null
        }
        try {
            const url = new URL(text)
            if (url.origin !== 'https://www.youtube.com') {
                return 'Введите корректный адрес ролика с сайта YouTube'
            }
            // const params = new URLSearchParams(url.searchParams)
            const vParam = url.searchParams.get('v')
            if (!vParam) {
                return 'Введите корректный адрес ролика с сайта YouTube'
            }
            onSubmit(vParam)
        } catch (e) {
            return 'Введите корректный адрес'
        }
        return null
    }, [value]);

    return <>
        <TextField
            {...args}
            id="outlined-basic"
            label="ссылка на виеоролик"
            variant="outlined"
            fullWidth
            value={text}
            onChange={e => setText(e.target.value)}
        />
        {error
         ? <Typography
             variant="caption"
             color={'red'}
             component={'span'}
         >
             {error}
         </Typography>
         : null}
    </>
});

function App() {
    const [serverComments, setServerComments] = useState([])
    const medianToxicProb = useMemo(() => serverComments.reduce((acc, val) => acc + val[1], 0) / serverComments.length, [serverComments]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = async (id) => {
        console.log(id)
        setError(null)
        try {
            setIsLoading(true)
            const res = await CommentsService.neuroProcessing(id)
            setServerComments(res)
        } catch (e) {
            console.log(e.message)
            setServerComments([])
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (<ThemeProvider theme={theme}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline/>
            <Container
                component="main"
                sx={{
                    mt: 8,
                    mb: 2
                }}
                maxWidth="md"
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    textAlign={'center'}
                >
                    Neuro toxic
                </Typography>
                <Typography
                    textAlign={'center'}
                    variant="body1"
                    component="div"
                    gutterBottom
                >
                    {'Определите какой процент токсичных комментариев '}
                    {'под вашим видео на YouTube !'}
                </Typography>

                <Box
                    pt={2}
                    pb={4}
                >
                    <LinkField
                        disabled={isLoading}
                        onSubmit={onSubmit}
                    />
                </Box>
                {
                    error
                    ? <Typography
                        textAlign={'center'}
                        variant="body1"
                        component="div"
                        sx={{color: 'red'}}
                        gutterBottom
                    >
                        Ошибка сервера: {error}
                    </Typography>
                    : null
                }
                {
                    isLoading
                    ?
                    <Box
                        pt={4}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <CircularProgress/>
                    </Box>
                    : null
                }

                {
                    serverComments.length && !isLoading
                    ? <>
                        <Typography
                            variant="body1"
                            component="div"
                            pb={2}
                        >
                            Средний процент токсичности комментариев под этим
                            видео {getPercent(medianToxicProb)}%
                        </Typography>
                        <CommentsTable
                            serverComments={serverComments}
                            callbackfn={([comment, probability], i) => (<TableRow
                                key={i + "key_comments"}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {comment}
                                </TableCell>
                                <TableCell align="right">{getPercent(probability)}%</TableCell>
                            </TableRow>)}
                        />
                    </>
                    : null
                }

            </Container>
            <Footer
                backgroundColor={(theme) => theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[800]}
            />
        </Box>
    </ThemeProvider>);
}

export default App;
