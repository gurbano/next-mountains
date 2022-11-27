/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Mesh } from 'three';
import { Canvas } from '@react-three/fiber';

function UgolinoModel(props) {
  console.log('LOADING ASSETS FROM', process.env.SERVER_URL);
  const { nodes, materials } = useGLTF(`${process.env.SERVER_URL}ugolino.glb`)
  const mesh = useRef<Mesh>(nodes.zz_decimated as any);
  return (
    <group {...props} dispose={null}>
      <mesh geometry={mesh.current.geometry} material={materials.Material_0} rotation={[Math.PI / 2, 0, Math.PI ]} />
    </group>
  )
}

useGLTF.preload(`${process.env.SERVER_URL}ugolino.glb`);


const Ugolino = () => (
  <div className={'CanvasWrapper'}>
    <Canvas 
      camera={{ position: [0, 40, 0], up: [0,0,1] }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <UgolinoModel position={[0, 0, 0]}  />
      <mesh position={[0, 0, -24]}>
          <planeBufferGeometry attach="geometry" args={[250, 150]}  />
          <meshPhongMaterial attach="material" color="blue" />
      </mesh>
      <OrbitControls 
        // autoRotate
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  </div>
);

export default Ugolino;