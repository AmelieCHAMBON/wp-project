import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { Button, RadioControl, ToggleControl, BaseControl } = wp.components
const { InspectorControls, PlainText, URLInputButton, MediaPlaceholder } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/blog`

registerBlockType(BLOCK_NAME, {
  title: __('Blog'),
  description: __('Mise en page des derniers articles du blog'),
  icon: 'grid-view',
  category: 'widgets',
  attributes: {
    titre: {
      type: 'string',
      default: ""
    },
    nbGrid: {
        type: 'string',
        default: "2"
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
    },
    content: {
      type: 'array'
    }
  },

  edit: props => {
    const { attributes: { titre = '', nbGrid = "2", bgColor, bgColorClass, switchDisplay, content = [] }, setAttributes, className } = props
    if(bgColor == true) {
        setAttributes( { bgColorClass : 'beige ' } )
    }
    return(
      <>
        <section className={className}>
            <h2>Blog</h2>

            <PlainText
            keepplaceholderonfocus
            placeholder={__('Titre / Accroche de la section Blog')}
            value={titre}
            onChange={(titre) => {setAttributes({ titre })
            }}
            />
            
            {content.map((value, index) => {
                return (
                    <>
                    <div className="blog-elt">
                        <div className={className + '__image'}>
                            {content[index].imageUrl ? (
                                <img src={content[index].imageUrl} alt='' />
                            ) : (
                                <MediaPlaceholder
                                onSelect={(media) => {
                                    const newContent = [...content]
                                    newContent[index].imageUrl = media.url
                                    newContent[index].imageId = media.id
                                    setAttributes({ content: newContent })}}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: 'Image de l\'article' }}
                                />
                            )}
                        </div>

                        <PlainText
                            keepplaceholderonfocus
                            placeholder={__('Titre de l\'article')}
                            value={value.title}
                            onChange={(title) => {
                            const newContent = [...content]
                            newContent[index].title = title
                            setAttributes({ content: newContent })
                            }}
                        />

                        <PlainText
                            keepplaceholderonfocus
                            placeholder={__('Date de l\'article (Exemple : 12 fév 2019)')}
                            value={value.date}
                            onChange={(date) => {
                            const newContent = [...content]
                            newContent[index].date = date
                            setAttributes({ content: newContent })
                            }}
                        />

                        <URLInputButton
                            url={ value.url }
                            onChange={(url) => {
                            const newContent = [...content]
                            newContent[index].url = url
                            setAttributes({ content: newContent })
                            }}
                        />
                    </div>
                    <Button isTertiary
                        onClick={() => {
                        const newContent = [
                            ...content.slice(0, index),
                            ...content.slice(index + 1)
                        ]
                        setAttributes({ content: newContent })
                        }}
                    >{__('Supprimer')}
                    </Button>
                    </>
                )
            })}
                
        <Button isPrimary 
          onClick={() => {
            const newContent = [...content, {}]
            setAttributes({ content: newContent })
          }}
        >{__('Ajouter')}
        </Button>

        <InspectorControls>
            <BaseControl>
                <RadioControl
                    label="Nombre de colonnes"
                    help="Le nombre de colonnes de la grille à l'affichage"
                    selected={ nbGrid }
                    options={ [
                        { label: '2 colonnes', value: "2" },
                        { label: '3 colonnes', value: "3" },
                        { label: '4 colonnes', value: "4" },
                        { label: '5 colonnes', value: "5" },
                    ] }
                    onChange={( nbGrid ) => { setAttributes({ nbGrid }) }}
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

  save: ({ attributes: { titre, nbGrid, bgColorClass, switchDisplay, content = [] } }) => (
    <section className={"content " + bgColorClass + "blog-preview"}>
        <h2 class="titre_grid">{titre}</h2>
        <div className={"blog_list " + "g" + nbGrid}>
            {content.map((item, index) => {
                return (                    
                    <a class="blog_post" href={item.url} key={`blog_post-${index}`}>
                        <div class="img_crop">
                            <img src={item.imageUrl} />
                        </div>
                        <h2 class="h2">{item.title}</h2> 
                        <span>{item.date}</span>
                    </a>
                )
            })}
        </div>
        
        {switchDisplay &&
                <a class="main-button" href="">Plus d’articles</a>
        }
   
    </section>
  )
})
