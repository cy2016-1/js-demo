const data = [
    {
        id: 1,
        name: 'a',
        children: [
            {
                id: 12,
                name: 'aa',
                children: [
                    {
                        id: 121,
                        name: 'aaa'
                    },
                    {
                        id: 122,
                        name: 'aab'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'b',
        children: [
            {
                id: 22,
                name: 'ba',
                children: [
                    {
                        id: 221,
                        name: 'baa'
                    },
                    {
                        id: 222,
                        name: 'bab'
                    }
                ]
            }
        ]
    }
]
const result = data.reduce(function (prev, curr) {
    prev.push({
        id: curr.id,
        name: curr.name,
        parentId: curr.parentId,
        ref: curr
    })
    curr.children && curr.children.forEach(v => {
        v.parentId = curr.id
        arguments.callee(prev, v)
    })
    return prev
}, [])
const findItem = result.find(v => v.id === 22)
if (findItem) {
    console.log(findItem.ref)
}
// console.log('转换前', JSON.stringify(data, null, 4))
// console.log('转换后', result)
