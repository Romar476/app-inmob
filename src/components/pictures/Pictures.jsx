export const Pictures = ( { webp , jpg , alt } ) => {
    return(
        <picture>
            <source srcSet={(`/assets/${webp}`)} alt={alt} type="image/webp"/>
            <img src={(`/assets/${jpg}`)} alt={alt} type="image/jpg"/>
        </picture>
    )
}