module.exports = token => new Promise(resolve => {
  return resolve(`
<div>
  <h1>Your token is</h1>
  <p>${token}</p>
</div>`
)});
