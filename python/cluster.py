import json
from pandas import Series 
import numpy
with open('bangumi.json','r',encoding = 'utf-8') as f:
    bangumi = json.load(f)
    #company_list={'0':[]}
    company_list={}
    music_list={}
    script_list={}
    director_list={}
    storyboard_list={}
    cv_list={}
    label_list_=[]
    fg_list_=[]
    index=-1
    global max_calc
    global max_class
    global max_label
    max_calc=0
    max_label=[]
    max_class=0
    for i in bangumi:
        index+=1
        label_list_.append(index)
        fg_list_.append(0)
        if 'company_id' in i.keys() and len(i['company_id']) > 0:
            j = i['company_id'][0]
            if j in company_list.keys():
                company_list[j].append(index)
            else:
                company_list[j] = []
                company_list[j].append(index)
        if 'music_id' in i.keys() and len(i['music_id']) > 0:
            j = i['music_id'][0]
            if j in music_list.keys():
                music_list[j].append(index)
            else:
                music_list[j] = []
                music_list[j].append(index)
        if 'script_id' in i.keys() and len(i['script_id']) > 0:
            j = i['script_id'][0]
            if j in script_list.keys():
                script_list[j].append(index)
            else:
                script_list[j] = []
                script_list[j].append(index)
        if 'director_id' in i.keys() and len(i['director_id']) > 0:
            j = i['director_id'][0]
            if j in director_list.keys():
                director_list[j].append(index)
            else:
                director_list[j] = []
                director_list[j].append(index)
        if 'storyboard_id' in i.keys() and len(i['storyboard_id']) > 0:
            j = i['storyboard_id'][0]
            if j in storyboard_list.keys():
                storyboard_list[j].append(index)
            else:
                storyboard_list[j] = []
                storyboard_list[j].append(index)
        if 'cv_id' in i.keys() and len(i['cv_id']) > 0:
            j = i['cv_id'][0]
            if j in cv_list.keys():
                cv_list[j].append(index)
            else:
                cv_list[j] = []
                cv_list[j].append(index)
    mask_ = [0,0,0,0,0,0]
    def tmp(z,maskx):
        mask = maskx.copy()
        if z<5:
            tmp(z+1,mask)
            mask[z]=1
            tmp(z+1,mask)
        else:
            calc(mask,fg_list_,label_list_)
            mask[z]=1
            calc(mask,fg_list_,label_list_)

    def calc(mask,fg_list_,label_list_):
        label_list = label_list_.copy()
        fg_list = fg_list_.copy()
        if mask[0]==1:
            for i in company_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        if mask[1]==1:
            for i in music_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        if mask[2]==1:
            for i in script_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        if mask[3]==1:
            for i in director_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        if mask[4] == 1:
            for i in storyboard_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        if mask[5]==1:
            for i in cv_list.values():
                if len(i) >1:
                    for j in i:
                        for k in range(len(label_list)):
                            if label_list[k] == label_list[j]:
                                label_list[k] = label_list[i[0]]
                                fg_list[k] = 1
        index=0
        for i in range(len(fg_list)):
            if fg_list[i] == 0:
                if index == 0:
                    index = i
                label_list[i] = index

        class_list=[]
        for i in range(len(label_list)):
            if label_list[i] not in class_list:
                class_list.append(label_list[i])
            label_list[i] = class_list.index(label_list[i])
        narray=numpy.array(label_list)
        N = len(label_list)
        sum1=narray.sum()
        narray2=narray*narray
        sum2=narray2.sum()
        mean=sum1/N
        var=sum2/N-mean**2
        global max_calc
        global max_class
        global max_label
        if(var/len(class_list) > max_calc):
            max_calc = var/len(class_list)
            max_class = len(class_list)
            max_label = label_list.copy()
        print(var)
        print(len(class_list))
        print(label_list)
        print(mask)
    tmp(0,mask_)
    print(max_label)
    print(max_class)