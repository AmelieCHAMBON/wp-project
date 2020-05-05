import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks } = wp.blockEditor
const { Button, BaseControl } = wp.components
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/newsletter`

registerBlockType(BLOCK_NAME, {
  title: __('Newsletter'),
  description: __('Mise en page de la Newsletter'),
  icon: 'id',
  category: 'common',
  attributes: {
    title: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    }
  },

  edit: props => {
    const { attributes: { title, imageUrl, imageId }, setAttributes, className } = props
    return(
      <>
        <div className="d-flex">
            <div>
                <div className="d-grid g2 ">
                    <div className="col-1">
                        <div>
                            <PlainText 
                              keepplaceholderonfocus
                              placeholder={ __( 'Titre / Accroche') }
                              className={ className }
                              value={title}
                              onChange={ (title) => {setAttributes( {title} )}}
                            />
                            <div className={className + '__text'}>
                            <InnerBlocks />
                            </div>
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className={className + '__image'}>
                        {imageUrl ? (
                            <img src={imageUrl} alt='' />
                        ) : (
                            <MediaPlaceholder
                            onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: 'Image de la newsletter' }}
                            />
                        )}
                        </div>
                    </div>
                </div>
            </div>
            
            <InspectorControls>
            <BaseControl>
                <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                type='image'
                value={imageId}
                className='file'
                render={({ open }) => (
                    <Button
                    className={!imageUrl && 'button button-large'}
                    onClick={open}
                    >
                    {
                        imageUrl ? (
                        <div className='inspector-controls-flex'>
                            <img className='inspector-controls-flex-img' src={imageUrl} alt='' />
                            <p>{__('Replace image')}</p>
                        </div>
                        ) : (
                        __('Select image')
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

  save: ({ attributes: { title,  imageUrl, imageId } }) => (
    <section class="newsletter content g2">
        <div>
          
          <h2>{title}</h2>

          <p><InnerBlocks.Content /></p>

        </div>

        <img src={imageUrl} alt=""/>
            
        
    </section>
  )
})
