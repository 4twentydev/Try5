import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import ProductList from "./components/ProductList"
import { Provider } from "react-redux"
import store from "./store"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    
      <Provider store={store}>
        <Router>
          <div className="App min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto py-6 px-4">
              <Routes>
                <Route path="/" element={<ProductList />} />
              </Routes>
            </main>
          </div>
        </Router>
      </Provider>
  )
}

export default App

