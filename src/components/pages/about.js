import React from 'react';

import profilePicture from '../../../static/assets/images/selfy/alex.jpg';

export default function(){
	return (
		<div className='about-page-wrapper'>
			<div
				className='left-column'
				style={{
					backgroundImage: `url(${profilePicture})`
				}}
			/>

			<div className='right-column'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa corporis laboriosam modi atque
					facere, voluptate distinctio ipsum sapiente esse est nobis doloremque totam at, sunt itaque voluptas
					id? Corporis, sequi. Fugit, harum sequi! Blanditiis soluta error molestiae. Laborum corporis velit
					sed blanditiis assumenda deleniti necessitatibus sunt magnam rerum qui, maxime vel quia rem,
					deserunt est dicta, ipsa doloremque quasi facilis? Sapiente quod expedita debitis ut vitae sed
					reprehenderit quia commodi, temporibus fugiat beatae voluptatibus, non in aperiam nisi consectetur!
					Aspernatur fugiat fugit reiciendis voluptas sapiente earum placeat adipisci illo fuga! Aperiam
					adipisci, autem, eos aliquid possimus nemo dolore ea repellendus doloribus cupiditate quod dolorem
					excepturi soluta sequi veritatis, iusto placeat veniam maxime perferendis! Error voluptatem odio
					voluptatum ut fuga totam! Ab, suscipit ipsam sunt autem modi animi praesentium, omnis aliquid dolor
					at corrupti provident. Ratione magni eum laudantium, ea obcaecati eos iusto expedita excepturi,
					fugiat fuga ad et cumque dolor.
				</p>
			</div>
		</div>
	);
}
