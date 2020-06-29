const diffHandler = ( pName, oldP, newP ) = > {
    if ( oldP && newP) return `${pName} was changed from ${oldP} to ${newP}`;
    if (!oldP) return `${pName} was added with ${newP}`;
    return `${pName} with ${oldP} was deleted`;
}

export default (diff, format) => {  
    if (diff.length === 0) return '';
    return diffHandler(...diff)(format);
}


