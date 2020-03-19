import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PortfolioForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			category: 'eCommerce',
			position: '',
			url: '',
			thumb_image: '',
			banner_image: '',
			logo: '',
			editMode: false, // Note // This helps create dynamic axio request with personalize Config setting in axios
			apiUrl: 'https://alexisflores.devcamp.space/portfolio/portfolio_items',
			apiAction: 'post'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleThumbDrop = this.handleThumbDrop.bind(this);
		this.handleBannerDrop = this.handleBannerDrop.bind(this);
		this.handleLogoDrop = this.handleLogoDrop.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

		this.thumbRef = React.createRef(); //Note // This will interact with the actual DOM and not the virtual DOM. Lets you grab in item by calling React.creatRef();
		this.bannerRef = React.createRef();
		this.logoRef = React.createRef(); // NOte //create a refernce object, and can put in the JSX code and call it from anywhere
	}

	deleteImage(imageType) {
		axios
			.delete(
				`https://alexisflores.devcamp.space/portfolio/delete-portfolio-image/${this.state
					.id}?image_type=${imageType}`, //Note //Most API will let you had a question mark so you can add addtional information)
				{
					withCredentials: true
				}
			)
			.then((response) => {
				if (response.status === 200) {
					this.setState({
						[`${imageType}_url`]: '' // Note // We setState with array for the key when we set a dynamic key
					});
				}
			})
			.catch((error) => {
				console.log('deleteImage error', error);
			});
	}

	componentDidUpdate() {
		// Note // const obj1 = {} // Object.keys(obj1).length will return 0 in this case
		if (Object.keys(this.props.portfolioToEdit).length > 0) {
			/* Question */ // debugger;
			const {
				id,
				name,
				description,
				category,
				position,
				url,
				thumb_image_url,
				banner_image_url,
				logo_url
			} = this.props.portfolioToEdit;

			this.props.ClearPortfolioToEdit(); //Question //

			this.setState({
				id: id,
				name: name || '',
				description: description || '',
				category: category || 'eCommerce',
				position: position || '',
				url: url || '',
				editMode: true,
				apiUrl: `https://alexisflores.devcamp.space/portfolio/portfolio_items/${id}`,
				apiAction: 'patch',
				thumb_image_url: thumb_image_url || '', // Note // We had change the key name from thumb_image to thumb_image_url ti help with a bug when the status was on editMode on the web page/ -When we dropped in image into something that did not have an image it show the image blank
				banner_image_url: banner_image_url || '', // Question / Ask about the names
				logo_url: logo_url || ''
			});
		}
	}

	handleThumbDrop() {
		return {
			addedfile: (file) => this.setState({ thumb_image: file })
		};
	}

	handleBannerDrop() {
		return {
			addedfile: (file) => this.setState({ banner_image: file })
		};
	}

	handleLogoDrop() {
		return {
			addedfile: (file) => this.setState({ logo: file })
		};
	}

	componentConfig() {
		return {
			iconFiletypes: [ '.jpg', '.png' ],
			showFiletypeIcon: true,
			postUrl: 'https://httpbin.org/post' // We will pass mock url so it does not upload the image automatically
		};
	}

	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1
		};
	}

	buildForm() {
		let formData = new FormData();

		formData.append('portfolio_item[name]', this.state.name); // QUESTIONS // where does he get the portolfio_item name from? is it just a key?
		formData.append('portfolio_item[description]', this.state.description);
		formData.append('portfolio_item[url]', this.state.url);
		formData.append('portfolio_item[category]', this.state.category);
		formData.append('portfolio_item[position]', this.state.position);

		if (this.state.thumb_image) {
			formData.append('portfolio_item[thumb_image]', this.state.thumb_image);
		}
		if (this.state.banner_image) {
			formData.append('portfolio_item[banner_image]', this.state.banner_image);
		}
		if (this.state.logo) {
			formData.append('portfolio_item[logo]', this.state.logo);
		}
		// NOTES
		// DEBUGGER;
		// TO call from debugger FormData has a specific way. Using a for loop: for ( var value of formData.values()) { console.log(value) };
		return formData;
	}

	handleChange(event) {
		//Note // debugger;
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		axios({
			method: this.state.apiAction,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true
		})
			.then((response) => {

					this.state.editMode ? this.props.handleEditFormSubmission() :
					this.props.handleNewFormSubmission(response.data.portfolio_item);

				this.setState({
					// Note //Highly discourage to do State manually on .then() function after a API call
					name: '', // Note // This are only our state and we need to learn the form
					description: '',
					category: 'eCommerce',
					position: '',
					url: '',
					thumb_image: '',
					banner_image: '', // This is just the state of our components and will not really remove the images
					logo: '',
					editMode: false,
					apiUrl: 'https://alexisflores.devcamp.space/portfolio/portfolio_items',
					apiAction: 'post'
				});
				window.scrollTo(0, 0);
				[ this.thumbRef, this.bannerRef, this.logoRef ].forEach((ref) => {
					// This is diretly into the dom
					// Question // where is this information being grabbed from???
					ref.current.dropzone.removeAllFiles(); //Note // ref.current is reaching into the specific item
				}); // This will help clear the drop zones
			})
			.catch((error) => {
				console.log('portfolio form handleSubmit error', error);
			});

		event.preventDefault();

		// Synthetic event is a virtual DOM which is created in React. It is not actually touching the Real DOM, and the virual DOM is created for performance
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
				<div className='two-column'>
					<input
						type='text'
						name='name'
						placeholder='Portfolio Item Name'
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input
						type='text'
						name='url'
						placeholder='URL'
						value={this.state.url}
						onChange={this.handleChange}
					/>
				</div>
				<div className='two-column'>
					<input
						type='text'
						name='position'
						placeholder='Position'
						value={this.state.position}
						onChange={this.handleChange}
					/>
					<select
						name='category'
						value={this.state.category}
						onChange={this.handleChange}
						className='select-element'>
						<option value='eCommerce'>eCommerce</option>
						<option value='Scheduling'>Scheduling</option>
						<option value='Enterprise'>Enterprise</option>
						<option value='Technology'>Technology</option>
					</select>
				</div>
				<div className='one-column'>
					<textarea
						type='text'
						name='description'
						placeholder='Description'
						value={this.state.description}
						onChange={this.handleChange}
					/>
				</div>

				<div className='image-uploaders'>
					{
						this.state.thumb_image_url &&
						this.state.editMode ? <div className='portfolio-manager-image-wrapper'>
							<img src={this.state.thumb_image_url} />
							<div className='image-removal-link' /* Note -- We use this method because we do not want the function to fire unless a user has clicked on the record */>
								<a onClick={() => this.deleteImage('thumb_image')}>
									<FontAwesomeIcon icon='minus-circle' />
								</a>
							</div>
						</div> :
						<DropzoneComponent
							ref={this.thumbRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleThumbDrop()}>
							<div className='dz-message' /*Note // This is child property of DropzoneComponent*/>
								Thumbnail
							</div>
						</DropzoneComponent>}

					{
						this.state.banner_image_url &&
						this.state.editMode ? <div className='portfolio-manager-image-wrapper'>
							<img src={this.state.banner_image_url} />
							<div className='image-removal-link'>
								<a onClick={() => this.deleteImage('banner_image')}>
									<FontAwesomeIcon icon='minus-circle' />
								</a>
							</div>
						</div> :
						<DropzoneComponent
							ref={this.bannerRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleBannerDrop()}>
							<div className='dz-message'>Banner</div>
						</DropzoneComponent>}

					{
						this.state.logo_url &&
						this.state.editMode ? <div className='portfolio-manager-image-wrapper'>
							<img src={this.state.logo_url} />

							<div className='image-removal-link'>
								<a onClick={() => this.deleteImage('logo')}>
									<FontAwesomeIcon icon='minus-circle' />
								</a>
							</div>
						</div> :
						<DropzoneComponent
							ref={this.logoRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleLogoDrop()}>
							<div className='dz-message'>Logo</div>
						</DropzoneComponent>}
				</div>

				<div>
					<button className='btn' type='submit'>
						Save
					</button>
				</div>
			</form>
		);
	}
}
