import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/newsletter-inscription`

registerBlockType(BLOCK_NAME, {
  title: __('Formulaire Newsletter'),
  description: __('Formulaire d\'inscription à la Newsletter'),
  icon: 'buddicons-pm',
  category: 'layout',
  attributes: {
    title: {
      type: 'string',
      default: 'S\'inscrire'
    }
  },

  edit: props => {
    const { attributes: { title }, setAttributes, className } = props
    return (
        <>        
            <h2>Formulaire d'Inscription à la Newsletter</h2>

            <div>
                <PlainText 
                keepplaceholderonfocus
                placeholder={ __( 'Texte du Bouton d\'envoi') }
                className={ className }
                value={title}
                onChange={ (title) => {
                    setAttributes( {title} )
                } }
                />
            </div>
        </>
    )
  },

  save: props => {
    const { attributes: { title }, setAttributes, className } = props
    return (
        <form class="news">
            <input type="email" placeholder="Votre email" />
            <button type="submit" class="main-button">{title}</button>
        </form>
    )
  }
})
