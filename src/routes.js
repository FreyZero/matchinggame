import Home from './components/Home.vue'
import Game from './components/Display.vue'
import Gallery from './components/Gallery.vue'

export const routes = [
    { path: '', component: Home },
    { path: '/game', component: Game },
    { path: '/gallery', component: Gallery }
]