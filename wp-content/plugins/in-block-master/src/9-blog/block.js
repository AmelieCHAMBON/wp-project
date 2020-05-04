import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { InspectorControls } = wp.blockEditor
const { RadioControl, ToggleControl, BaseControl } = wp.components
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/blog`

registerBlockType(BLOCK_NAME, {
  title: __('Blog'),
  description: __('Mise en page des derniers articles du blog'),
  icon: 'grid-view',
  category: 'widgets',
  attributes: {
    title: {
      type: 'string'
    },
    nbGrid: {
        type: 'number',
        default: 2
    },
    nbArticles: {
        type: 'number'
    },
    bgColor: {
        type: 'boolean',
        default: false
    },
    bgColorClass: {
        type: 'string',
        default: ''
    },
    switchDisplay: {
      type: 'boolean',
      default: true
    }
  },

  edit: props => {
    const { attributes: { title, nbGrid = 2, nbArticles = nbGrid, bgColor, bgColorClass, switchDisplay }, setAttributes, className } = props
    if(bgColor == true) {
        setAttributes( { bgColorClass : 'beige ' } )
    }
    return(
      <>
        <section className={className}>
            <h2>Blog</h2>
            <PlainText 
                keepplaceholderonfocus="true"
                placeholder={ __( 'Titre / Accroche') }
                className={ className + '_titre' }
                value={title}
                onChange={ (title) => {
                    setAttributes( title )
                } }
            />
            <p>Vos articles seront ensuite affiché en-dessous du titre ci-dessus.</p>
            
        <InspectorControls>
            <BaseControl>
                <RadioControl
                    label="Nombre de colonnes"
                    help="Le nombre de colonnes de la grille à l'affichage"
                    selected={ nbGrid }
                    options={ [
                        { label: '2 colonnes', value: 2 },
                        { label: '3 colonnes', value: 3 },
                        { label: '4 colonnes', value: 4 },
                        { label: '5 colonnes', value: 5 },
                    ] }
                    onChange={( nbGrid ) => { setAttributes({ nbGrid }) }}
                />
            </BaseControl>
            <BaseControl>
                <RadioControl
                    label="Nombre maximum d'articles à afficher'"
                    help="La limite d'articles à ne pas dépasser"
                    selected={ nbArticles }
                    options={ [
                        { label: (nbGrid*1)+' articles', value: (nbGrid*1) },
                        { label: (nbGrid*2)+' articles', value: (nbGrid*2) },
                        { label: (nbGrid*3)+' articles', value: (nbGrid*3) },
                        { label: (nbGrid*4)+' articles', value: (nbGrid*4) },
                    ] }
                    onChange={( nbArticles ) => { setAttributes({ nbArticles }) }}
                />
            </BaseControl>
            <BaseControl>
                <ToggleControl
                label={__("Afficher le lien vers le blog entier")}
                checked={switchDisplay}
                onChange={(switchDisplay) => { 
                    setAttributes({ switchDisplay }) 
                }}
                />
            </BaseControl>
        </InspectorControls>

        </section>
      </>
    )
  },

  save: ({ attributes: { title, nbGrid, nbArticles, bgColorClass, switchDisplay } }) => (
    <section className={"content " + bgColorClass + "blog-preview"}>
        <h2>{{title}}</h2>
        <div className={"blog_list " + "g" + nbGrid}>
            {JSON.stringify(nbArticles)} max articles affichés
        </div>
        
        {switchDisplay &&
                <a class="main-button" href="">Plus d’articles</a>
        }
   
    </section>
  )
})
