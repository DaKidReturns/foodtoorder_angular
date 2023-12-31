USE [master]
GO
/****** Object:  Database [FoodToOrder_Rohit]    Script Date: 27-10-2023 18:00:10 ******/
CREATE DATABASE [FoodToOrder_Rohit]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FoodToOrder_Rohit', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\FoodToOrder_Rohit.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FoodToOrder_Rohit_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\FoodToOrder_Rohit_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [FoodToOrder_Rohit] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FoodToOrder_Rohit].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ARITHABORT OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET  MULTI_USER 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FoodToOrder_Rohit] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FoodToOrder_Rohit] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FoodToOrder_Rohit] SET QUERY_STORE = ON
GO
ALTER DATABASE [FoodToOrder_Rohit] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [FoodToOrder_Rohit]
GO
/****** Object:  Table [dbo].[addresses]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[addresses](
	[id] [int] NOT NULL,
	[house_no] [int] NOT NULL,
	[street] [varchar](25) NOT NULL,
	[area] [varchar](25) NOT NULL,
	[city] [varchar](25) NOT NULL,
	[state] [varchar](25) NOT NULL,
	[country] [varchar](25) NOT NULL,
	[pincode] [varchar](6) NOT NULL,
 CONSTRAINT [PK_addresses] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart_dishes]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart_dishes](
	[cart_id] [int] NOT NULL,
	[dish_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
 CONSTRAINT [PK_cart_dishes] PRIMARY KEY CLUSTERED 
(
	[cart_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[carts]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[carts](
	[id] [int] NOT NULL,
	[amount] [money] NOT NULL,
 CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dish_descriptions]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dish_descriptions](
	[id] [int] NOT NULL,
	[description] [ntext] NOT NULL,
 CONSTRAINT [PK_dish_description] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dishes]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dishes](
	[id] [int] NOT NULL,
	[name] [varchar](25) NOT NULL,
	[cost] [money] NOT NULL,
	[isAvailable] [bit] NOT NULL,
	[image] [varchar](50) NOT NULL,
	[restaurant_id] [int] NOT NULL,
 CONSTRAINT [PK_dishes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_dishes]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_dishes](
	[order_id] [int] NOT NULL,
	[dish_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
 CONSTRAINT [PK_order_dishes] PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[restaurant_id] [int] NOT NULL,
	[order_time] [datetime] NOT NULL,
 CONSTRAINT [PK_orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[restaurants]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[restaurants](
	[id] [int] NOT NULL,
	[name] [varchar](25) NOT NULL,
	[image] [varchar](100) NOT NULL,
	[ownerId] [int] NOT NULL,
 CONSTRAINT [PK_restaurants] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[restaurants_addresses]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[restaurants_addresses](
	[restaurant_id] [int] NOT NULL,
	[address_id] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 27-10-2023 18:00:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] NOT NULL,
	[first_name] [varchar](25) NOT NULL,
	[last_name] [varchar](25) NOT NULL,
	[role] [nchar](30) NOT NULL,
	[dob] [date] NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[address_id] [int] NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[cart_dishes]  WITH CHECK ADD  CONSTRAINT [FK_cart_dishes_dishes] FOREIGN KEY([dish_id])
REFERENCES [dbo].[dishes] ([id])
GO
ALTER TABLE [dbo].[cart_dishes] CHECK CONSTRAINT [FK_cart_dishes_dishes]
GO
ALTER TABLE [dbo].[carts]  WITH CHECK ADD  CONSTRAINT [FK_Cart_users] FOREIGN KEY([id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[carts] CHECK CONSTRAINT [FK_Cart_users]
GO
ALTER TABLE [dbo].[dish_descriptions]  WITH CHECK ADD  CONSTRAINT [FK_dish_description_dishes] FOREIGN KEY([id])
REFERENCES [dbo].[dishes] ([id])
GO
ALTER TABLE [dbo].[dish_descriptions] CHECK CONSTRAINT [FK_dish_description_dishes]
GO
ALTER TABLE [dbo].[dishes]  WITH CHECK ADD  CONSTRAINT [FK_dishes_restaurants] FOREIGN KEY([restaurant_id])
REFERENCES [dbo].[restaurants] ([id])
GO
ALTER TABLE [dbo].[dishes] CHECK CONSTRAINT [FK_dishes_restaurants]
GO
ALTER TABLE [dbo].[order_dishes]  WITH CHECK ADD  CONSTRAINT [FK_order_dishes_dishes] FOREIGN KEY([dish_id])
REFERENCES [dbo].[dishes] ([id])
GO
ALTER TABLE [dbo].[order_dishes] CHECK CONSTRAINT [FK_order_dishes_dishes]
GO
ALTER TABLE [dbo].[order_dishes]  WITH CHECK ADD  CONSTRAINT [FK_order_dishes_orders] FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([id])
GO
ALTER TABLE [dbo].[order_dishes] CHECK CONSTRAINT [FK_order_dishes_orders]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_orders_restaurants] FOREIGN KEY([restaurant_id])
REFERENCES [dbo].[restaurants] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_orders_restaurants]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_orders_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_orders_users]
GO
ALTER TABLE [dbo].[restaurants]  WITH CHECK ADD  CONSTRAINT [FK_restaurants_users] FOREIGN KEY([ownerId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[restaurants] CHECK CONSTRAINT [FK_restaurants_users]
GO
ALTER TABLE [dbo].[restaurants_addresses]  WITH CHECK ADD  CONSTRAINT [FK_restaurants_addresses_addresses] FOREIGN KEY([address_id])
REFERENCES [dbo].[addresses] ([id])
GO
ALTER TABLE [dbo].[restaurants_addresses] CHECK CONSTRAINT [FK_restaurants_addresses_addresses]
GO
ALTER TABLE [dbo].[restaurants_addresses]  WITH CHECK ADD  CONSTRAINT [FK_restaurants_addresses_restaurants] FOREIGN KEY([restaurant_id])
REFERENCES [dbo].[restaurants] ([id])
GO
ALTER TABLE [dbo].[restaurants_addresses] CHECK CONSTRAINT [FK_restaurants_addresses_restaurants]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_addresses] FOREIGN KEY([address_id])
REFERENCES [dbo].[addresses] ([id])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_addresses]
GO
USE [master]
GO
ALTER DATABASE [FoodToOrder_Rohit] SET  READ_WRITE 
GO
