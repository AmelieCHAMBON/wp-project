import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { InspectorControls, MediaPlaceholder, InnerBlocks, PlainText } = wp.blockEditor
const { Button, RadioControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/cibles`

registerBlockType(BLOCK_NAME, {
  title: __('Cibles'),
  description: __('Grille des cibles'),
  icon: 'grid-view',
  category: 'layout',
  attributes: {
    title: {
      type: "string",
      default: ""
    },
    content: {
      type: 'array'
    },
    nbGrid: {
        type: 'string'
    }
  },

  edit: props => {
    const { attributes: { title = '', content = [], nbGrid = '2' }, setAttributes, className } = props
    return (
      <>
      <section className="separator grid-cible">
      <PlainText
                keepplaceholderonfocus
                placeholder={__('Titre de la grille de cible')}
                value={title}
                onChange={(title) => {setAttributes({ title })
                }}
              />
        {content.map((value, index) => {
          return (
            <>
            <div className="cible-elt">
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
                        labels={{ title: 'Image de la cible' }}
                        />
                    )}
                </div>

              <PlainText
                keepplaceholderonfocus
                placeholder={__('Demo')}
                value={value.title}
                onChange={(title) => {
                  const newContent = [...content]
                  newContent[index].title = title
                  setAttributes({ content: newContent })
                }}
              />
              <div className={className + '__text'}>
              <InnerBlocks allowedBlocks={['core/paragraph']} />
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
            </div>
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
                <RadioControl
                    label="Nombre de colonnes"
                    help="Le nombre de colonnes de la grille à l'affichage"
                    selected={ nbGrid }
                    options={ [
                        { label: '2 colonnes', value: '2' },
                        { label: '3 colonnes', value: '3' },
                        { label: '4 colonnes', value: '4' },
                        { label: '5 colonnes', value: '5' },
                    ] }
                    onChange={( nbGrid ) => { setAttributes({ nbGrid }) }}
                />
            </InspectorControls>
        </section>
      </>
    )
  },

  save: props => {
    const { attributes: {  title, nbGrid, content } } = props
    return (
      <section className="content cibles">
        <h2 className="titre_grid">{{title}}</h2>
        <div className={"g"+nbGrid}>
            {content.map((item, index) => {
              return (
                <div className="cibles_cible"  key={`cible-${index}`}>
                    <img src={item.imageUrl} alt=""/>
                    <h3>{item.title}</h3>
                    <p><InnerBlocks.Content /></p>
                </div>
              )
            })}
        </div>
      </section>
    )
  }
})
