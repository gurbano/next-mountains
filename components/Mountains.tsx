import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
    }
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      THIS IS A REMOTE EXPERIMENT
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[.5, .5, .5]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </>
  )
}

const Mountains = () => (
  <div className={'CanvasWrapper'}>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Box position={[0, 1.2, 0]} />
      <Box position={[0, -1.2, 0]} />
    </Canvas>
  </div>
);

export default Mountains