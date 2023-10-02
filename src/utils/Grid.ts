export default function classesCss(colunas: string) {
    // Verifica se a valor passado está nulo ou vazio
    const cols = colunas ? colunas.split(' ') : []
    // Inicializa a variavel que armazena as classes
    let classes = ''
    // Pega os valores das classes
    if (cols[0]) classes += ` col-${cols[0]}`
    if (cols[1]) classes += ` md:col-${cols[1]}`
    if (cols[2]) classes += ` lg:col-${cols[2]}`

    // for (let i = 3; i < cols.length; i++) {
    //     if (cols[i].indexOf('offset-md-')) {
    //         let offset = cols.split('-')
    //         classes += ` md:col-offset-${offset[1]}`
    //     } else if (cols[i].indexOf('offset-lg-')) {
    //         let offset = cols.split('-')
    //         classes += ` lg:col-offset-${offset[1]}`
    //     } else if (cols[i].indexOf('offset-')) {
    //         let offset = cols.split('-')
    //         classes += ` col-offset-${offset[1]}`
    //     }
    // }

    return classes
}