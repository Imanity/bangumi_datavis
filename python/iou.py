import json

f = open("json/bangumi.json", encoding = 'utf-8')
bangumi = json.load(f)

fw = open("json/iou.js", 'w')
iou_data = []

def iou(X, Y):
    res = 0
    if len(X) == 0 and len(Y) == 0:
        return 0.0
    for x in X:
        if x in Y:
            res += 1
    return float(res)

for i, x in enumerate(bangumi):
    for j, y in enumerate(bangumi):
        if i >= j:
            continue
        keys = ['cv_id', 'storyboard_id', 'music_id', 'company_id', 'director_id', 'script_id']
        ious = []
        for k in range(0, 6):
            if keys[k] in x and keys[k] in y:
                ious.append(iou(x[keys[k]], y[keys[k]]))
            else:
                ious.append(0.0)
        all_zero = True
        for k in range(0, 6):
            if ious[k] != 0.0:
                all_zero = False
        if not all_zero:
            iou_data.append({"x": i, "y": j, "iou": ious})

fw.write('var iou = ')
fw.write(json.dumps(iou_data))
fw.write(';')
