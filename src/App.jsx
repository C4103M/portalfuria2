import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Config from './pages/Config/Config.jsx'
import Admin from './pages/Admin/Admin.jsx'
import News from './pages/News/News.jsx'
import CreatePost from './pages/Admin/CreatePost.jsx'
import PostDetalhado from './pages/News/Slug.jsx'
import Chat from './pages/Chat/Chat.jsx'
import Moderate from './pages/Admin/Moderate.jsx'
import EditPost from './pages/Admin/EditPost.jsx'
import EditPostExpand from './pages/Admin/EditPostExpand.jsx'
function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/portalfuria2/" element={<Home />}/>
					<Route path="/portalfuria2/login" element={<Login />} />
					<Route path="/portalfuria2/config" element={<Config />} />
					<Route path="/portalfuria2/admin" element={<Admin />} />
					<Route path="/portalfuria2/news" element={<News />} />
					<Route path="/portalfuria2/noticias" element={<News />} />
					<Route path="/portalfuria2/noticias/:slug" element={<PostDetalhado />} />
					<Route path="/portalfuria2/news/:slug" element={<PostDetalhado />} />
					<Route path="/portalfuria2/create" element={<CreatePost />} />
					<Route path="/portalfuria2/moderate" element={<Moderate/>} />
					<Route path="/portalfuria2/editPosts" element={<EditPost/>}/>
					<Route path="/portalfuria2/edit/:slug" element={<EditPostExpand />} />
					<Route path="/portalfuria2/chat/:user_id" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
