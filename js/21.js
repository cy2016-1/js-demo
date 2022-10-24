const data = [
    { id: 1, name: 'a'},
    { id: 12, name: 'aa', parentId: 1 },
    { id: 121, name: 'aaa', parentId: 12 },
    { id: 122, name: 'aab', parentId: 12 },
    { id: 2, name: 'b'},
    { id: 22, name: 'ba', parentId: 2 },
    { id: 221, name: 'baa', parentId: 22 },
    { id: 222, name: 'bab', parentId: 22 }
]
const result = data.reduce(function (prev, curr, i, arr) {
    curr.children = arr.filter(v => v.parentId === curr.id)
    if (!curr.parentId) {
        prev.push(curr)
    }
    return prev
}, [])
console.log('转换前', data)
console.log('转换后', JSON.stringify(result, null, 4))