import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n

const BLOCK_NAME = `${PLUGIN_NAME}/separateur-fleche`

registerBlockType(BLOCK_NAME, {
  title: __('Flèche séparatrice'),
  description: __('Séparateur en forme de flèche'),
  icon: 'arrow-down-alt2',
  category: 'layout',

  edit: () => {
    return (
        <div class="separator"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10">
            <path fill="#56D2CC" fill-opacity=".5" fill-rule="nonzero" d="M2.006 0L8.5 6.214 14.994 0 17 1.91 8.5 10 0 1.91z"/>
        </svg>
    </div>
    )
  },

  save: () => {
    return (
        <div class="separator"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10">
            <path fill="#56D2CC" fill-opacity=".5" fill-rule="nonzero" d="M2.006 0L8.5 6.214 14.994 0 17 1.91 8.5 10 0 1.91z"/>
        </svg>
    </div>
    )
  }
})
