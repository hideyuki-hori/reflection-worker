/* @refresh reload */
import { render } from 'solid-js/web'
import { Stack } from 'panda/jsx'
import './panda.css'

const root = document.getElementById('__REFRECTION_WORKER__')

render(() => <Stack direction='row' gap='20'>
  <div>aaa</div>
  <div>aaa</div>
  <div>aaa</div>
</Stack>, root!)
