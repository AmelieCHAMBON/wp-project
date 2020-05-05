import { PLUGIN_NAME } from '../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/solution`

registerBlockType(BLOCK_NAME, {
  title: __('Solution'),
  description: __('Mise en page d\'une solution'),
  icon: 'id',
  category: 'common',
  attributes: {
    title: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    backgroundUrl: {
      type: 'string'
    },
    backgroundId: {
      type: 'integer'
    },
    switchDisplay: {
      type: 'boolean',
      default: false
    },
    displayClass: {
      type: 'string',
      default: 'ltr'
    }
  },

  edit: props => {
    const { attributes: { title, name, imageUrl, imageId, backgroundUrl, backgroundId, switchDisplay, displayClass }, setAttributes, className } = props
    if(switchDisplay == true) {
        setAttributes( { displayClass : 'rtl' } )
    }
    return(
      <>
        <div className="d-flex">
            <div>
                <div className={"d-grid g2 " + displayClass}>
                    <div className="col-1">
                        <div>
                            <PlainText 
                              keepplaceholderonfocus
                              placeholder={ __( 'Nom') }
                              className={ className }
                              value={name}
                              onChange={ (name) => {
                                  setAttributes( {name} )
                              } }
                            />
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
                            labels={{ title: 'Image de la solution' }}
                            />
                        )}
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
            <BaseControl>
                <ToggleControl
                label={__("Alterner l'image et les textes")}
                checked={switchDisplay}
                onChange={(switchDisplay) => { 
                    let classD = "ltr";
                    if (switchDisplay == true) {
                        classD = "rtl";
                    }
                    setAttributes({ switchDisplay: switchDisplay, displayClass: classD }) 
                }}
                />
            </BaseControl>
            </InspectorControls>

        </div>
      </>
    )
  },

  save: ({ attributes: { title, name, imageUrl, imageId, backgroundUrl, backgroundId, displayClass } }) => (
    <section class={"solutions_solution content g2 "+displayClass}>
        <div>

          <h3>{name}</h3>
          
          <h2>{title}</h2>

          <p><InnerBlocks.Content /></p>

           <a class="main-button" href="#">Découvrir {name}</a>

        </div>

        <img src={imageUrl} alt=""/>
        
		    {backgroundUrl &&
                <img class="solutions_solution_background" src={backgroundUrl} />
        }
            
        
    </section>
  )
})
