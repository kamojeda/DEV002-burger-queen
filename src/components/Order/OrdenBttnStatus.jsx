const OrdenBttnStatus = ({ statusArray, selectStatus }) => {
	return (
		<div className='flex flex-row items-center justify-center md:justify-center md:gap-6 lg:pl-36'>
			{statusArray.map((status) => (
				<button
					className='flex items-center w-32 pr-2 py-2 border-b border-secoundary-one hover:border-main text-main text-2xl'
					key={status}
					onClick={() => selectStatus(status)}>
					{status}
				</button>
			))}
		</div>
	);
};

export { OrdenBttnStatus };
