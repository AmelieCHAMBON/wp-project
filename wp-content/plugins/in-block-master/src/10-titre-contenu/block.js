import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks } = wp.blockEditor
const { Button, BaseControl } = wp.components
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/titre-contenu`

registerBlockType(BLOCK_NAME, {
  title: __('Contenu titré'),
  description: __('Mise en page d\'un titre à gauche et d\'un contenu libre à droite'),
  icon: 'index-card',
  category: 'layout',
  attributes: {
    title: {
      type: 'string'
    },
    backgroundUrl: {
      type: 'string'
    },
    backgroundId: {
      type: 'integer'
    }
  },

  edit: props => {
    const { attributes: { title, backgroundUrl, backgroundId }, setAttributes, className } = props
    return(
      <>
        <div className="d-flex">
            <div>
                <div className={"d-grid g2"}>
                        <div>
                            <PlainText 
                            keepplaceholderonfocus="true"
                            placeholder={ __( 'Titre / Accroche') }
                            className={ className }
                            value={title}
                            onChange={ (title) => {
                                setAttributes( {title} )
                            } }
                            />
                        </div>
                        <div>
                            <div className={className + '__text'}>
                                <InnerBlocks />
                            </div>
                        </div>
                </div>
                
                <div className={className + '__image'}>
                    {backgroundUrl ? (
                        <img src={backgroundUrl} alt='' />
                    ) : (
                        <MediaPlaceholder
                        onSelect={(media2) => setAttributes({ backgroundUrl: media2.url, backgroundId: media2.id })}
                        allowedTypes={['image']}
                        multiple={false}
                        labels={{ title: 'Background image de la solution' }}
                        />
                    )}
                    </div>
                </div>
            
            <InspectorControls>
                <BaseControl>
                    <MediaUpload
                        onSelect={(media2) => setAttributes({ backgroundUrl: media2.url, imageId: media2.id })}
                        type='image'
                        value={backgroundId}
                        className='file'
                        render={({ open }) => (
                            <Button
                                className={!backgroundUrl && 'button button-large'}
                                onClick={open}
                                >
                                {
                                    backgroundUrl ? (
                                    <div className='inspector-controls-flex'>
                                        <img className='inspector-controls-flex-img' src={backgroundUrl} alt='' />
                                        <p>{__('Replace background image')}</p>
                                    </div>
                                    ) : (
                                    __('Select background image')
                                    )
                                }
                            </Button>
                        )}
                    />
                </BaseControl>
            </InspectorControls>

        </div>
      </>
    )
  },

  save: ({ attributes: { title, backgroundUrl } }) => (
    <section class="content g2 titre-contenu">
        <div>
            <h2 class="titre_séparé">{title}</h2>
            <div class="separateur"></div>
        </div>
        <div>
            <InnerBlocks.Content />
        </div>
            
        {backgroundUrl &&
                <img class="titre-contenu_background" src={backgroundUrl} />}
    </section>
  )
})
