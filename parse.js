
function parse(Taglist, AbundantTags, PriorityTag, RemoveTags){

    if(PriorityTag){
        Taglist = Taglist.replace(PriorityTag, '');
        Taglist = PriorityTag.concat(',', Taglist);
    }

    if(RemoveTags){
        AbundantTags.forEach(tag => Taglist = Taglist.replace(tag + ' ', ''));
    }

    Taglist = Taglist.replace(/_?\([^()]*\)/g, '')

    while(Taglist.includes(' ') || Taglist.includes('&#039;')){

        Taglist = Taglist.replace(' ', ',');
        Taglist = Taglist.replace('&#039;', '\'');

    }
    while(Taglist.includes('_')){

        Taglist = Taglist.replace('_', ' ');

    }

    return Taglist;

};


module.exports = {parse};