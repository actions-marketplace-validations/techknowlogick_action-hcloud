# GitHub Actions for DigitalOcean

This action enables you to interact with [DigitalOcean](https://www.digitalocean.com/) services by installing [the `doctl` command-line client](https://github.com/digitalocean/doctl).

## Usage

To install the latest version of `doctl` and use it in GitHub Actions workflows, add the following step:

```yaml
    - name: Install doctl
      uses: digitalocean/action-doctl@v2
      with:
        token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
```

`doctl` will now be available in the virtual environment and can be used directly in following steps. As an example, one common use case is retrieving the credentials for a Kubernetes cluster hosted on DigitalOcean for use in a deployment workflow:

```yaml
    - name: Save DigitalOcean kubeconfig
      run: doctl kubernetes cluster kubeconfig save testing-cluster
```

See [this repository](https://github.com/do-community/example-doctl-action) for a full end-to-end example that also demonstrates building a Docker image, pushing it to Docker Hub, and using `kubectl` to deploy it to the Kubernetes cluster on DigitalOcean.

### Arguments

- `token` – (**Required**) A DigitalOcean personal access token ([more info](https://www.digitalocean.com/docs/api/create-personal-access-token/)).
- `version` – (Optional) The version of `doctl` to install. If excluded, the latest release will be used.

## Contributing

To install the needed dependencies, run `npm install`. The resulting `node_modules/` directory _is not_ checked in to Git.

Before submitting a pull request, run `npm run package` to package the code [using `ncc`](https://github.com/zeit/ncc#ncc). Packaging assembles the code including dependencies into one file in the `dist/` directory that is checked in to Git.

Pull requests should be made against the `v2` branch.

## License

This GitHub Action and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
