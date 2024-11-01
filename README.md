1. Download docker from this link: https://docs.docker.com/desktop/install/windows-install/

2. Double click and follow the installation wizard.

3. When prompted, ensure the Use WSL 2 instead of Hyper-V option on the Configuration page is selected or not depending on your choice of backend.
   If your system only supports one of the two options, you won't be able to select which backend to use.

4. Restart your PC

5. You can check if your docker is working by entering on your cmd/Powershell: docker --version

6. Clone this repo : https://github.com/iamsubendu/News_aggragator

7. Go inside the cloned folder and open terminal

8. Now use following commands in the terminal

9. docker build -t news-aggregator .

10. docker build -f Dockerfile.dev -t news-aggregator .

11. docker run -it --name newsAggreagator -p 3000:3000 news-aggregator

12. open browser & now you can check this in : http://localhost:3000/
