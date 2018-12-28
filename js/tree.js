var new_person_list = new Array();
var new_person_id_list = new Array();
for (var i = 0; i < person.length; ++i) {
    if (new_person_id_list.indexOf(person[i].id) < 0) {
        new_person_id_list.push(person[i].id);
        new_person_list.push(person[i]);
    }
}
person = new_person_list;
var map_id_list={};
for (i in bangumi){
    map_id_list[bangumi[i].id] = i.toString();
}
var company_list = {};
var cv_list = {};
var music_list = {};
var storyboard_list = {};
var director_list = {};
var script_list = {};
for (var i = 0; i < bangumi.length; i++){
    for (j in bangumi[i].cv_id) {
        if (cv_list.hasOwnProperty(bangumi[i].cv_id[j])){
            cv_list[bangumi[i].cv_id[j]].push(bangumi[i].id);
        } else {
            cv_list[bangumi[i].cv_id[j]] = new Array();
            cv_list[bangumi[i].cv_id[j]].push(bangumi[i].id);
        }
    }
    for (j in bangumi[i].company_id) {
        if (company_list.hasOwnProperty(bangumi[i].company_id[j])){
            company_list[bangumi[i].company_id[j]].push(bangumi[i].id);
        } else {
            company_list[bangumi[i].company_id[j]] = new Array();
            company_list[bangumi[i].company_id[j]].push(bangumi[i].id);
        }
    }
    for (j in bangumi[i].music_id) {
        if (music_list.hasOwnProperty(bangumi[i].music_id[j])){
            music_list[bangumi[i].music_id[j]].push(bangumi[i].id);
        } else {
            music_list[bangumi[i].music_id[j]] = new Array();
            music_list[bangumi[i].music_id[j]].push(bangumi[i].id);
        }
    }
    for (j in bangumi[i].storyboard_id) {
        if (storyboard_list.hasOwnProperty(bangumi[i].storyboard_id[j])){
            storyboard_list[bangumi[i].storyboard_id[j]].push(bangumi[i].id);
        } else {
            storyboard_list[bangumi[i].storyboard_id[j]] = new Array();
            storyboard_list[bangumi[i].storyboard_id[j]].push(bangumi[i].id);
        }
    }
    for (j in bangumi[i].director_id) {
        if (director_list.hasOwnProperty(bangumi[i].director_id[j])){
            director_list[bangumi[i].director_id[j]].push(bangumi[i].id);
        } else {
            director_list[bangumi[i].director_id[j]] = new Array();
            director_list[bangumi[i].director_id[j]].push(bangumi[i].id);
        }
    }
    for (j in bangumi[i].script_id) {
        if (script_list.hasOwnProperty(bangumi[i].script_id[j] )){
            script_list[bangumi[i].script_id[j]].push(bangumi[i].id);
        } else {
            script_list[bangumi[i].script_id[j]] = new Array();
            script_list[bangumi[i].script_id[j]].push(bangumi[i].id);
        }
    }
}
