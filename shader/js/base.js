// 初始化webgl
const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.getElementById('container').appendChild( renderer.domElement )
// 初始化相机
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 )
camera.position.setZ(10)

const controls = new OrbitControls(camera, renderer.domElement)
// 初始化场景
const scene = new THREE.Scene()
// 灯光
const light = new THREE.AmbientLight( 0xff8800, 0.3 )
scene.add( light )
scene.add(initShader())

// 窗口自适应
window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
})
// 渲染
function animate() {
    controls.update()
    renderer.render( scene, camera )
    requestAnimationFrame(animate)
}
animate()

function initShader() {
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.ShaderMaterial( {
        uniforms: typeof uniforms === 'object' ? uniforms : {},
        vertexShader: document.getElementById('vertexShader').innerHTML,
        fragmentShader: document.getElementById('fragmentShader').innerHTML
    });
    console.log(boxGeometry.attributes)
    return new THREE.Mesh(boxGeometry, material || new THREE.MeshPhongMaterial({
        color: 0xff8800
    }))
}