import '../styles/globals.css'
import {ReactQueryProvider} from '../utils/ReactQueryProvider'

function MyApp({ Component, pageProps }) {
  return(
    <ReactQueryProvider> 
      
      Testing: app view

       <Component {...pageProps}/>
    </ReactQueryProvider>
     )
}

export default MyApp
